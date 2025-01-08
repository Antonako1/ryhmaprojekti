export default async function CarPage({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const slug = (await params).slug
    return <div>Car: {slug}</div>
  }