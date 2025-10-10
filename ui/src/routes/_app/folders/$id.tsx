import { useQuery } from "@tanstack/react-query"
import { createFileRoute, useParams } from "@tanstack/react-router"
import { foldersControllerGetByIdOptions } from "../../../api-client"
import { AppBar } from "../../../components/app-bar"
import { list, phonePage } from "../../../shared/skins"
import { Folder, FolderSkeletons } from "../../../components/folder"
import { ErrorParagraph } from "../../../components/error-paragraph"
import { GoBackInHistoryBtn } from "../../../components/go-back-in-history-btn"
import ReactMarkdown from "react-markdown"
import { BottomTabs } from "../../../components/bottom-tabs"

export const Route = createFileRoute("/_app/folders/$id")({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = useParams({ from: "/_app/folders/$id" })
  const folderId = Number(id)
  const {
    data: folder,
    isSuccess,
    isError,
    isPending,
    refetch,
  } = useQuery(foldersControllerGetByIdOptions({ path: { id: folderId } }))

  return (
    <div className={phonePage()}>
      <AppBar title={folder?.title || ""} slotStart={<GoBackInHistoryBtn />} />

      <div className={list()}>
        {isPending && <FolderSkeletons />}

        {isSuccess &&
          folder.subFolders.map(f => (
            <Folder
              key={f.id}
              id={f.id}
              title={f.title}
              description={f.description}
            />
          ))}

        {isSuccess &&
          folder.pieces.map(p => (
            <ReactMarkdown key={p.id}>
              {p.type === "TEXT" ? (p.payload.content as string) : null}
            </ReactMarkdown>
          ))}

        {isError && <ErrorParagraph onClick={() => refetch()} />}
      </div>

      <BottomTabs />
    </div>
  )
}
