import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useRecoilValue } from 'recoil';
import { collectionPublicListState } from '../recoil-state/collection-state';

export default function TopBar() {

  const [openDrawer, setOpenDrawer] = React.useState(false);

  function toggleDrawer(newOpen: boolean) {
    setOpenDrawer(newOpen);
  }

  const collectionList = useRecoilValue(collectionPublicListState);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <IconButton onClick={() => {toggleDrawer(true)}} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Cà Phê CoffeeTree
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => toggleDrawer(false)}
      >
        <Box
          sx={{width: "250px"}}
        >
          <List>

            {collectionList.map((collection) => (
              <ListItem disablePadding key={collection.id}>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={collection.name} />
                </ListItemButton>
              </ListItem>
            ))}
            
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Sản phẩm bán chạy" />
              </ListItemButton>
            </ListItem>

            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Thông tin khuyến mãi" />
              </ListItemButton>
            </ListItem>

          </List>
        </Box>
      </Drawer>
    </>
  );
}