import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { AdminAlbumsHeader } from "~/components/admin/AdminAlbumsHeader";
import { AdminAlbumsTable } from "~/components/admin/AdminAlbumsTable";
import { LoadingSection } from "~/components/layout/Loader";
import MainLayout from "~/components/layout/MainLayout";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { trpc } from "~/utils/trpc";

const AdminAlbumsPage: NextPage = () => {
  useSession({ required: true });

  const {
    data: albums,
    isLoading: isLoadingAlbums,
    refetch: refetchAlbums,
  } = trpc.album.getAllAsAdmin.useQuery(undefined, {
    refetchOnWindowFocus: false,
    retry: () => false,
    onError: () => {
      toast.error("Okänt fel, försök igen senare", { duration: 5000 });
    },
  });

  return (
    <MainLayout>
      <SectionWrapper className="mx-auto my-4 min-h-screen max-w-7xl px-4 xl:px-0">
        <AdminAlbumsHeader refetchAllAlbums={() => refetchAlbums()} />
        {isLoadingAlbums && <LoadingSection />}
        {albums && (
          <AdminAlbumsTable
            albums={albums}
            refetchAllAlbums={() => refetchAlbums()}
          />
        )}
      </SectionWrapper>
    </MainLayout>
  );
};

export default AdminAlbumsPage;
