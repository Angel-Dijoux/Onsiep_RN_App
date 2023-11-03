import { Box } from "$shared/ui/primitives";
import { Skeleton } from "$shared/ui/primitives/Skeleton";
import { colors } from "$shared/ui/primitives/theme/colors";
import { deviceWidth } from "$utils/deviceInfo";

const WIDTH = deviceWidth * 0.8;
const HEIGHT = 19;

export function CardFormationDetailsSkeleton() {
  return (
    <Box bg="PRIMARY_2" mt="global_15" p="global_15" borderRadius="global_8">
      <Skeleton
        skeletonWidth={WIDTH}
        height={HEIGHT}
        borderRadius="global_8"
        bg="PRIMARY_8"
        colors={[colors.TRANSPARENT, colors.PRIMARY_9, colors.TRANSPARENT]}
      />
      <Box flexDirection="row" gap="global_24" my="global_10">
        <Skeleton
          skeletonWidth={45}
          height={HEIGHT}
          borderRadius="global_8"
          bg="PRIMARY_7"
          colors={[colors.TRANSPARENT, colors.PRIMARY_8, colors.TRANSPARENT]}
        />
        <Skeleton
          skeletonWidth={65}
          height={HEIGHT}
          borderRadius="global_8"
          bg="PRIMARY_7"
          colors={[colors.TRANSPARENT, colors.PRIMARY_8, colors.TRANSPARENT]}
        />
      </Box>
      <Skeleton
        skeletonWidth={WIDTH}
        height={HEIGHT}
        borderRadius="global_8"
        bg="PRIMARY_6"
        colors={[colors.TRANSPARENT, colors.PRIMARY_7, colors.TRANSPARENT]}
      />
      <Box pt="global_15" alignItems="center">
        <Skeleton
          skeletonWidth={35}
          height={HEIGHT}
          borderRadius="round"
          bg="PRIMARY_11"
          colors={[colors.TRANSPARENT, colors.PRIMARY_12, colors.TRANSPARENT]}
        />
      </Box>
    </Box>
  );
}
