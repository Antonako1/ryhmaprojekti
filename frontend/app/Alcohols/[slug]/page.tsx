export default async function AlcoholPage({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const slug = (await params).slug
    return <div>Alcohol: {slug}</div>
  }