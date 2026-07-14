import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

export const Sidebar = (props: React.PropsWithChildren) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        position: "fixed",
        zIndex: theme.zIndex.appBar,
        insetInlineStart: 0,
        insetBlock: 0,

        blockSize: "100dvh",
        overflow: "hidden",

        borderInlineEnd: "1px solid",
        borderColor: theme.palette.divider,

        display: "flex",
        flexDirection: "column",

        ["[data-show-sidebar=true] &"]: {
          transition: theme.transitions.create(
            ["inline-size", "max-inline-size"],
            {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            },
          ),
          inlineSize: { xs: "100%", sm: "100%" },
          maxInlineSize: {
            sm: "calc(var(--sidebar-width) * 8px)",
          },
        },
        ["[data-show-sidebar=false] &"]: {
          transition: theme.transitions.create(
            ["inline-size", "max-inline-size"],
            {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            },
          ),
          inlineSize: { xs: 0, sm: "100%" },
          maxInlineSize: {
            sm: 0,
          },
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6">4399</Typography>
        <Box sx={{ mx: "auto" }} />
        {props.children}
      </Toolbar>
      <Divider></Divider>
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <Box sx={{ height: 2000 }}>
          <Box sx={{ p: 1.5 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos,
            praesentium neque nostrum officiis aliquam ratione illo culpa
            reprehenderit tempora veniam dolores necessitatibus sed nesciunt
            magnam incidunt mollitia, amet aut cum. Quia eum natus quod
            voluptas. Pariatur, enim iste at ipsum deserunt magni facere. Quas
            repudiandae ducimus quos odit perspiciatis molestiae itaque
            mollitia, exercitationem autem corrupti ipsa explicabo. Maiores,
            doloribus nisi? Enim molestiae voluptate, minus aliquam nihil unde
            a. Voluptates nisi consectetur, totam nobis provident sed laborum
            odio. Blanditiis aspernatur fugiat accusantium eos consequuntur
            quae, exercitationem ab ullam? Eligendi, aspernatur? Tempora! Optio,
            ratione exercitationem temporibus ducimus sed similique facere quam
            excepturi cum ipsa sint, sit aliquid? Ipsam ab, corporis culpa dolor
            excepturi, sapiente voluptatum illo ad quaerat officia perspiciatis,
            quae natus! Voluptatum maxime deserunt, neque praesentium quas id.
            Ut praesentium tempore ducimus nesciunt fugiat impedit, voluptatum
            labore ipsam, libero id qui, mollitia sapiente cumque molestiae
            quam! Harum architecto assumenda debitis temporibus? Quibusdam
            dolorem consectetur repellendus asperiores corporis ad maxime optio
            similique. Hic reprehenderit fuga incidunt necessitatibus. Debitis
            facilis, illum eveniet dolores quidem voluptate reiciendis a
            corrupti blanditiis ex mollitia, sint amet. Eaque explicabo ab
            delectus voluptatum atque non rerum impedit at adipisci deleniti
            inventore consectetur odio nesciunt ut repellendus, molestias
            sapiente nisi cupiditate illum commodi debitis voluptatem
            necessitatibus saepe! Aut, consequuntur. Consequuntur dolores
            officiis ipsa quis ratione sunt libero inventore quo veritatis autem
            id vero quibusdam debitis tempore placeat quaerat aspernatur harum
            nesciunt exercitationem excepturi repellat labore, optio
            perspiciatis eum? Minus? Nam ad reiciendis qui ex cum repudiandae
            perferendis totam quas doloremque deleniti voluptate molestiae
            soluta non accusantium dolor distinctio porro, quod fuga veniam sint
            eius dolorem. Nihil dolorem ea necessitatibus. Ipsam itaque est
            recusandae omnis, laudantium architecto quibusdam corporis
            repudiandae, labore quidem porro, quaerat non esse reprehenderit?
            Voluptatum, blanditiis, ex nam necessitatibus veritatis officiis
            enim ad placeat saepe, eaque repellendus.
          </Box>
        </Box>
      </Box>
      <Divider></Divider>
      <Box sx={{ display: "flex", p: 1, gap: 1 }}>
        <Avatar>S</Avatar>
        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            Show
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            3182703224@qq.com
          </Typography>
        </Box>
        <Box sx={{ mx: "auto" }}></Box>
        <IconButton>
          <MoreVert />
        </IconButton>
      </Box>
    </Paper>
  );
};
