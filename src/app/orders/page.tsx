'use client'
import OrdersList from "@/components/tables/OrdersList";
import { isAuthenticated } from "@/utils/Auth/Auth";
import { useLayoutEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const isAuth = isAuthenticated();
    if (!isAuth) {
      redirect("/")
    } else setIsLoading(false);
  }, [])

  // useEffect(() => {
  //   axios.post(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/auth`, {
  //     token: token
  //   })
  //     .then(function (response) {
  //       response.status === 200 ? setIsLoading(false) : setIsLoading(true);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   setTimeout(() => router.push("/"), 2000);
  // }, [token])

  if (isLoading) {
    return (<div className="flex justify-center"><span className="loading loading-bars loading-lg"></span></div>)
  } else {
    return (<div className="flex justify-center flex-col"><OrdersList /></div>)
  };
}
