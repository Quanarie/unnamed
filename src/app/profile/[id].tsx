// import {useRouter} from 'next/router'
// import {GetStaticPaths, GetStaticProps} from "next";
//
// export default function Page() {
//   const router = useRouter();
//   return <p>{router.query.id}</p>;
// }
//
// export const getStaticPaths: GetStaticPaths = async () => {
//   const ids = ['1', '2', '3'];
//
//   const paths = ids.map(
//     id => (
//       {
//         params: {id},
//       }
//     )
//   );
//
//   return {paths, fallback: true};
// };
//
// export const getStaticProps: GetStaticProps = async ({params}) => {
//   const id = params?.id;
//
//   const data = {name: 'Sample Name', id};
//
//   return {
//     props: {
//       data,
//     },
//   };
// };