import React from "react";
import { Box, ButtonBase, Typography } from "@mui/material";

export default function GameCard({title, onClick}) {
  const lineH = 30; // 텍스트 한 줄 높이(px)

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
        textAlign: "left",
      }}
    >
      <Box
        sx={{
          width: "100%",
          px: 3,
          py: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          display: "flex",
          alignItems: "center",
          gap: 2,
          transition: "transform 160ms ease, box-shadow 160ms ease",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: 2,
          },
          "&:hover .slideStack": {
            transform: `translateY(-${lineH}px)`,
          },
        }}
      >
        {/* Thumbnail 영역 */}
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            bgcolor: "grey.200",
            flexShrink: 0,
          }}
        />
        {/* 텍스트 슬라이드 영역 */}
        <Box sx={{ flex:1, minWidth:0 }}>
          <Box sx={{ height: `${lineH}px`, overflow: "hidden"}}>
            <Box
              className="slideStack"
              sx={{
                transition: "transform 220ms ease",
              }}
            >
              <Typography
                sx={{
                  height: `${lineH}px`,
                  lineHeight: `${lineH}px`,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </Typography>

              <Typography
                sx={{
                  height: `${lineH}px`,
                  lineHeight: `${lineH}px`,
                  fontWeight: 700,
                }}
              >
                Start Game!
              </Typography>
            </Box>
          </Box>

          <Typography variant="caption" color="text.secondary">
            Click to play immediately
          </Typography>
        </Box>
      </Box>
    </ButtonBase>
  )
}