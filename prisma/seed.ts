import { PrismaClient } from '../app/generated/prisma'
import bcrypt from "bcrypt";
import { PrismaPg } from '@prisma/adapter-pg';
import {Pool} from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is missing");

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");
  const hashedPassword = await bcrypt.hash("password123", 10);

  //teacher
  const teacher = await prisma.teacher.create({
    data: {
      tchr_name: "John",
      tchr_lastname: "Doe",
      tchr_email: "john.doe@example.com",
      tchr_password: hashedPassword,
    },
    
  });
   console.log("Teacher created:", teacher.tchr_id);

  //student
  const student = await prisma.student.create({
    data: {
      std_name: "Jane",
      std_lastname: "Smith",
      std_email: "jane.smith@example.com",
      std_password: hashedPassword,
    },
  });
   console.log("Student created:", student.std_id);

   //domain
  const domain = await prisma.domain.create({
    data:
    {
      dmn_title: "Mathematics",
      dmn_dscrptn: "All about numbers and equations",
      dmn_duration: 60,
    }
  });
  console.log("Domain created:", domain.dmn_id);

  //subdomain
  const subdomain = await prisma.subDomain.create({
    data:{
      subdom_title: "Algebra",
      domainId: domain.dmn_id,
    }
  });
  console.log("Subdomain created:", subdomain.subdom_id);

  //course
  const course = await prisma.course.create({
    data: {
      crs_title: "Introduction to Mathematics",
      crs_type: "pdf",
       //pdf_file: "math101.pdf",
      teacherId: teacher.tchr_id,
      subdom: subdomain.subdom_id,
    },
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
  });
