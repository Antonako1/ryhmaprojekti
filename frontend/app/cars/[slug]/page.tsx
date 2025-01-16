import ItemPage from "@/components/ItemPage/ItemPage"
import { server, Types } from "@/Utils/consts"
import { ICarDetails } from "@/Utils/Interfaces"

export default async function CarPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  let data: ICarDetails | null = null
  let error: string | null = null

  try {
    const response = await fetch(`${server}/api/cars/${slug}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch car details: ${response.statusText}`)
    }
    data = await response.json()
  } catch (err: any) {
    console.error(err)
    error = err.message
  }

  return <ItemPage 
    props={{
      item: data,
      error: error,
      type: Types.CARS
    }}
  />
}
