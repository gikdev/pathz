import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { foldersControllerGetAllOptions } from "../../api-client"
import { appBarIconBtn, list, page } from "../../shared/skins"
import { AppBar } from "../../components/app-bar"
import { Folder, FolderSkeletons } from "../../components/folder"
import { InfoIcon, PlusIcon } from "@phosphor-icons/react"
import { ErrorParagraph } from "../../components/error-paragraph"
import { BottomTabs } from "../../components/bottom-tabs"
import { Can } from "../../shared/auth"

export const Route = createFileRoute("/folders/")({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: folders,
    isSuccess,
    isPending,
    isError,
    refetch,
  } = useQuery(foldersControllerGetAllOptions())

  return (
    <div className={page()}>
      <AppBar
        title="مسیر"
        slotStart={
          <Can I="CREATE" a="FOLDER">
            <button className={appBarIconBtn()}>
              <PlusIcon />
            </button>
          </Can>
        }
        slotEnd={
          <button className={appBarIconBtn()} disabled>
            <InfoIcon />
          </button>
        }
      />

      <div className={list()}>
        {isPending && <FolderSkeletons />}

        {isSuccess &&
          folders.map(f => (
            <Folder
              key={f.id}
              id={f.id}
              title={f.title}
              description={f.description}
            />
          ))}

        {isError && <ErrorParagraph onClick={() => refetch()} />}
      </div>

      <BottomTabs />
    </div>
  )
}
