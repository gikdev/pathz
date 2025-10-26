import type { CourseResDto } from "#/generated/api-client"
import {
  BookOpenTextIcon,
  CaretRightIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"

interface CourseCardProps {
  id: number
  title: string
  description: string | null
}

interface CourseCardsListProps {
  courses: CourseResDto[]
}

export const CourseCard = {
  Core: ({ title, id }: CourseCardProps) => (
    <Link to="/courses/$id" params={{ id }}>
      <div className="flex flex-col gap-2 p-4 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer">
        <div className="flex gap-2 items-start">
          <SquaresFourIcon size={24} className="shrink-0 grow-0" />
          <p className="flex-1">{title}</p>
          <CaretRightIcon size={24} className="shrink-0 grow-0" mirrored />
        </div>
      </div>
    </Link>
  ),

  Skeleton: () => (
    <div className="flex gap-2 items-start animate-pulse p-4 bg-gray-50 border border-gray-300 rounded-lg">
      <div className="rounded-md bg-gray-300 size-6" />
      <div className="rounded-md bg-gray-300 h-6 w-24 me-auto" />
      <div className="rounded-md bg-gray-300 size-6" />
    </div>
  ),

  List: ({ courses }: CourseCardsListProps) => (
    <>
      {courses.map(c => (
        <CourseCard.Core
          key={c.id}
          id={c.id}
          title={c.title}
          description={c.description}
        />
      ))}
    </>
  ),

  ListSkeleton: () => (
    <>
      <CourseCard.Skeleton />
      <CourseCard.Skeleton />
      <CourseCard.Skeleton />
    </>
  ),

  Empty: () => (
    <div className="flex flex-col items-center justify-center p-4 gap-2">
      <BookOpenTextIcon size={24} />
      <p>فعلا دوره‌ای نداریم.</p>
    </div>
  ),
}
