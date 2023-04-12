import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { AdminAlbumHeader } from "~/components/admin/AdminAlbumHeader";
import { AdminAlbumTable } from "~/components/admin/AdminAlbumTable";
import { AdminUpdateAlbumWizard } from "~/components/admin/AdminUpdateAlbumWizard";
import { LoadingSection } from "~/components/layout/Loader";
import MainLayout from "~/components/layout/MainLayout";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { trpc } from "~/utils/trpc";

const AdminSingleAlbumPage: NextPage = () => {
  useSession({ required: true });
  const router = useRouter();

  const {
    data: album,
    isLoading: isLoadingAlbum,
    refetch: refetchAlbum,
  } = trpc.album.getOneAsAdmin.useQuery(
    {
      albumId: router.query.albumId as string,
    },
    {
      refetchOnWindowFocus: false,
      onSuccess(successData) {
        // Turn UTC time into local time
        const { date } = successData;
        const getHours = date.getHours();
        const getUTCOffset = date.getTimezoneOffset() / -60;
        date.setHours(getHours + getUTCOffset);
      },
      onError(e) {
        toast.error(`Okänt fel, försök igen senare!\n${e.data?.code ?? ""}`);
      },
    }
  );

  return (
    <MainLayout>
      <SectionWrapper className="mx-auto min-h-screen max-w-7xl px-4 xl:px-0">
        <AdminAlbumHeader
          albumId={album?.id ?? ""}
          refetchAlbum={refetchAlbum}
        />
        {isLoadingAlbum && <LoadingSection />}
        {album && (
          <>
            <AdminUpdateAlbumWizard
              album={album}
              refetchAlbum={() => refetchAlbum()}
            />
            <AdminAlbumTable
              images={album.images}
              refetchAlbum={() => refetchAlbum()}
            />
          </>
        )}
      </SectionWrapper>
    </MainLayout>
  );
};

export default AdminSingleAlbumPage;
