import { Scroll } from "@/components/scroll";
import { ScrollView } from "@/components/scrollbar";
import { Box, Button } from "@mui/material";

const Content = () => {
  return (
    <Box height={1920} width={500} padding={6}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus vitae
      quos repudiandae voluptate magnam molestias, aspernatur tempora?
      Distinctio, cupiditate perspiciatis temporibus repellendus iste, quo
      nostrum illum adipisci, tempora at dolorum. Architecto eius, optio officia
      velit repellat illo tempore dolor ipsam tenetur voluptatibus pariatur
      impedit nulla doloremque quidem harum molestias quis, eos a autem? Eveniet
      libero itaque nisi, sit molestiae maiores. Odio quidem reprehenderit
      soluta ratione odit quo cumque, quam nesciunt eum distinctio error sunt
      voluptate molestias iusto vero quia ab! Sint maiores ad cum. Cum placeat
      tempore delectus mollitia nemo! Totam placeat laborum, itaque delectus
      deserunt quam ut, ratione quibusdam pariatur magni cupiditate distinctio
      voluptates aliquid in sed deleniti sunt quas perspiciatis aperiam
      assumenda animi non veniam velit odio? Quis? Commodi eos deserunt neque
      voluptatem sed cumque nostrum at possimus, aliquam molestiae alias vero
      ipsa voluptas ex minus laudantium optio? Voluptatem repellendus dolor,
      quae cupiditate rerum iure et nisi magni.
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button>Click Me</Button>
      </Box>
    </Box>
  );
};

export const Component = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gridTemplateRows: "repeat(1, minmax(0, 1fr))",
        gap: 2,
        blockSize: "100%",
      }}
      data-contentFixed
    >
      <Box sx={{ border: "1px solid #ccc", blockSize: "100%" }}>
        <Scroll>
          <Content />
        </Scroll>
      </Box>
      <Box
        sx={{
          border: "1px solid #ccc",
          blockSize: "100%",
          overflow: "auto",
        }}
      >
        <Content />
      </Box>
      <Box sx={{ border: "1px solid #ccc", blockSize: "100%" }}>
        <ScrollView>
          <Content />
        </ScrollView>
      </Box>
    </Box>
  );
};
