import { Loading } from "$shared/ui/Loading";
import { Box } from "$shared/ui/primitives";
import React from "react";
import { Pressable } from "react-native";
import { SvgUri } from "react-native-svg";
import { useGetUserInformation } from "./useGetUserInformation";

type ProfilePictureProps = {
  onOpenModal: () => void;
  onClearSearch: () => void;
};

export function ProfilePicture({
  onOpenModal,
  onClearSearch,
}: Readonly<ProfilePictureProps>) {
  const { isLoading, data } = useGetUserInformation();

  const profile_pic_uri = data?.profile_pic_url
    ? data.profile_pic_url
    : "https://api.dicebear.com/7.x/notionists-neutral/svg?seed='onisep'";

  if (isLoading) return <Loading />;
  return (
    <Pressable onPress={onClearSearch} onLongPress={onOpenModal}>
      <Box overflow="hidden" borderRadius="round">
        <SvgUri
          height={PROFILE_PICTURE_SIZE}
          width={PROFILE_PICTURE_SIZE}
          uri={profile_pic_uri}
        />
      </Box>
    </Pressable>
  );
}

const PROFILE_PICTURE_SIZE = 38;
