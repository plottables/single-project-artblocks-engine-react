import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ConnectWallet from 'components/ConnectWallet';
import { appTitle } from 'config';

const Header = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" position="static" elevation={1}>
        <Toolbar sx={
          {
            width: '100%',
            display: 'flex',
            margin: 'auto',
            justifyContent: 'space-between',
          }
        }>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/" underline="hover" sx={{
              color: 'white',
            }}>
              <Typography variant="h6" color="inherit" mr={3} noWrap>
                { appTitle }
              </Typography>
            </Link>
          </Box>
          <ConnectWallet />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
