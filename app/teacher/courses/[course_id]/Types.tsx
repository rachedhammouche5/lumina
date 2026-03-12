type Topic = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  parentId: string | null;
};
type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
};



type TopicContentType = "video_url" | "audio_file" | "pdf_file" | "doc_url";

type TopicContentInput = {
  id: string;
  type: TopicContentType;
  value: string;
};
type TopicContent = {
  id: string;
  topicId:string;
  type: TopicContentType;
  value:string;
}

type TopicFormState = {
  title: string;
  description: string;
  contents: TopicContentInput[];
};

export type { Topic, Course, TopicContentType, TopicContentInput, TopicFormState, TopicContent};