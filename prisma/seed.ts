import { PrismaClient } from '../app/generated/prisma';
import bcrypt from "bcrypt";
import { PrismaPg } from '@prisma/adapter-pg';
import {Pool} from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is missing");

 const pool = new Pool({ connectionString });
 const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
if(process.env.NODE_ENV == "production"){
  throw new Error("seeding is not allowed in production environment");
}
async function main() {
  console.log("Seeding database...");
const teacherEmail = process.env.SEED_TEACHER_EMAIL || "john.doe@example.com";
const teacherPassword = process.env.SEED_TEACHER_PASSWORD ;
const studentEmail = process.env.SEED_STUDENT_EMAIL || "jane.smith@example.com";
const studentPassword = process.env.SEED_STUDENT_PASSWORD ;
if(!teacherPassword || !studentPassword){
  throw new Error("Teacher and student passwords must be provided in environment variables");
}
const hashedTeacherPassword = await bcrypt.hash(teacherPassword, 10);
const hashedStudentPassword = await bcrypt.hash(studentPassword, 10);

  //teacher
  const teacher = await prisma.teacher.upsert({
    where: { tchr_email: teacherEmail },
    update: {
      tchr_name: "John",
      tchr_lastname: "Doe",
      tchr_password: hashedTeacherPassword,
    },
    create: {
      tchr_name: "John",
      tchr_lastname: "Doe",
      tchr_email: teacherEmail,
      tchr_password: hashedTeacherPassword,
    }
  });
   console.log("Teacher created:", teacher.tchr_id);

  //student
  const student = await prisma.student.upsert({
    where: { std_email: studentEmail },
    update: {
      std_name: "Jane",
      std_lastname: "Smith",
      std_password: hashedStudentPassword,
    },
    create: {
      std_name: "Jane",
      std_lastname: "Smith",
      std_email: studentEmail,
      std_password: hashedStudentPassword,
    }
  });
   console.log("Student created:", student.std_id);

   //domain
  const domain = await prisma.domain.upsert({
    where: { dmn_title: "Mathematics" },
    update: {
      dmn_dscrptn: "All about numbers and equations",
      dmn_duration: 60,
    },
    create:
    {
      dmn_title: "Mathematics",
      dmn_dscrptn: "All about numbers and equations",
      dmn_duration: 60,
    }
  });
  console.log("Domain created:", domain.dmn_id);

  //subdomain
  const subdomain = await prisma.subDomain.upsert({
    where: { subdom_title: "Algebra" },
    update: {
      domainId: domain.dmn_id,
    },
    create: {
      subdom_title: "Algebra",
      domainId: domain.dmn_id,
    }
  });
  console.log("Subdomain created:", subdomain.subdom_id);

  //course
  const course = await prisma.course.upsert({
    where: { crs_title: "Introduction to Mathematics" },
    update: { 
      crs_type: "pdf",
       pdf_file: "math101.pdf",
      teacherId: teacher.tchr_id,
      subdom: subdomain.subdom_id,
    },
    create: {
      crs_title: "Introduction to Mathematics",
      crs_type: "pdf",
      pdf_file: "math101.pdf",
      teacherId: teacher.tchr_id,
      subdom: subdomain.subdom_id,
    }
  });
    console.log("Course created:", course.crs_id);

  //quiz
  const quiz=await prisma.quiz.create({
    data: {
      question: "What is 2+2?",
      difficulty: "easy",
      courseId: course.crs_id,
    }
  });
   console.log("Quiz created:", quiz.qst_id);

  //response
  const response=await prisma.q_response.create({
    data:{
      response: "4",
      isCorrect: true,
      quizId: quiz.qst_id,


    }
  });
    console.log("Response created:", response.rspns_id);
    console.log("Database seeding completed.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
   pool.end();
  });
