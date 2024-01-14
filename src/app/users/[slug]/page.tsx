export default function Page({ params }: { params: { slug: string } }) {
  return <div>Profile {params.slug}</div>;
}
