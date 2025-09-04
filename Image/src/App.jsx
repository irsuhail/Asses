import ImageCarousel from "./components/ImageCarousel"

function App() {
  const images = [
    "https://picsum.photos/id/1015/800/400",
    "https://picsum.photos/id/1016/800/400",
    "https://picsum.photos/id/1018/800/400",
    "https://picsum.photos/id/1019/800/400",
  ]

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Image Carousel</h1>
      <ImageCarousel images={images} />
    </div>
  )
}

export default App
