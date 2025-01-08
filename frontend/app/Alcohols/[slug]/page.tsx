import ItemPage from "@/components/ItemPage/ItemPage"
import { server } from "@/Utils/consts"
import { IAlcoholDetails } from "@/Utils/Interfaces"

export default async function AlcoholsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  let data: IAlcoholDetails | null = null
  let error: string | null = null

  try {
    const response = await fetch(`${server}/api/alcohol/${slug}`)
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
    }}
  />
}
