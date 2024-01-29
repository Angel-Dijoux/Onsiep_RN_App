import { Loading } from "$shared/ui/Loading";
import { borderRadii } from "$shared/ui/theme/borderRadii";
import { makeAppStyles } from "$shared/ui/theme/theme";
import React from "react";
import { Image, Pressable } from "react-native";
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

  const styles = useStyles();

  const profile_pic = data?.profile_picture_url
    ? data.profile_picture_url
    : "https://cdn.pixabay.com/photo/2017/03/05/21/55/emoticon-2120024_960_720.png";

  if (isLoading) return <Loading />;
  return (
    <Pressable onPress={onClearSearch} onLongPress={onOpenModal}>
      <Image
        source={{
          uri: profile_pic,
        }}
        style={styles.profilePicture}
        borderRadius={borderRadii.round}
      />
    </Pressable>
  );
}

const PROFILE_PICTURE_SIZE = 38;

const useStyles = makeAppStyles(({ colors }) => ({
  profilePicture: {
    height: PROFILE_PICTURE_SIZE,
    width: PROFILE_PICTURE_SIZE,
    borderColor: colors.PRIMARY_8,
    borderWidth: 1,
  },
}));
