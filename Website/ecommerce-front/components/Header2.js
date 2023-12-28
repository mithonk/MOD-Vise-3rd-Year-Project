export default function Header2() {
  return (
    <>
      <img src="/banner1.png" style={{ width: "100%", height: "300px" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img src="/banner2.jpeg" style={{ width: "33%", height: "250px" }} />
        <img src="/banner3.jpeg" style={{ width: "33%", height: "250px" }} />

        <img src="/banner4.jpeg" style={{ width: "33%", height: "250px" }} />
      </div>
    </>
  );
}
