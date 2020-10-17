interface DataProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  country: string;
  cityId: string;
  loading?: never;
}
interface SkeletonProps extends React.HTMLAttributes<HTMLElement> {
  name?: never;
  country?: never;
  cityId?: never;
  loading: boolean;
}

type Props = DataProps | SkeletonProps;

export default Props;
