import Header from "./components/Header.js"
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem';
import Property from "./components/Property.js";


const propertyList = [
  {
    title: 'Apartment',
    to: '/apartment',
    description: 'This apartment building has 30 available units for young professionals'
  },
  {
    title: 'Medical Office',
    to: '/medical',
    description: 'This medical office has 50 units for orthopedic surgeons.'
  }
]

function Home() {
  return (
    <>
      <Header />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '85%' }, }}
      >


      </Box>
      {propertyList.map((p) => (
        <MenuItem key={p.title}  sx={{justifyContent: "center", whiteSpace: 'normal'}}>
          <Property title={p.title} to={p.to} description={p.description} />
        </MenuItem>
      ))}
    </>

  );
}
export default Home;