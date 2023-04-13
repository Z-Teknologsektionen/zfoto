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
      retry: () => false,
      onError(err) {
        if (err.data?.code === "BAD_REQUEST") {
          toast.error("Finns inget album med det id:t!", { duration: 5000 });
          router.push("/admin/album");
        } else {
          toast.error("Okänt fel, försök igen senare");
        }
      },
    }
  );

  return (
    <MainLayout>
      <SectionWrapper>
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
