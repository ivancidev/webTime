import { CardForo } from "../components/card-foro"

const foroData = {
  title: "React",
  imgUrl: "https://reactjs.org/logo-og.png",
  description: "React is a JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies.",
}
export const Foro = () => {
  return (
    <>
      <CardForo {...foroData} />
    </>
  )
}
