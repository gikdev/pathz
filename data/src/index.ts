interface Course {
  id: string
  title: string
  description?: string
  modules: CourseModule[]
}

interface CourseModule {
  id: string
  title: string
  description?: string
  items: CourseModuleItem[]
}

interface BaseCourseModuleItem {
  id: string
  title: string
}

interface Exercise extends BaseCourseModuleItem {
  type: "exercise"
}
interface Quiz extends BaseCourseModuleItem {
  type: "quiz"
}
interface BaseLesson extends BaseCourseModuleItem {
  type: "lesson"
}

type Lesson = TextLesson | VideoLesson | AudioLesson

type CourseModuleItem = Exercise | Quiz | Lesson

interface TextLesson extends BaseLesson {
  format: "text"
}
interface VideoLesson extends BaseLesson {
  format: "video"
}
interface AudioLesson extends BaseLesson {
  format: "audio"
  fileId: string
  description?: string
}

const basicsOfHtml: Course = {
  id: "basics-of-web",
  title: "مقدمات وب",
  modules: [
    {
      id: "your-why",
      title: "چرایی",
      items: [
        {
          id: "what-is-the-why",
          title: "چرایی چیه؟",
          type: "quiz",
        },
      ],
    },
  ],
}
