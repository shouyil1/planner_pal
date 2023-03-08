import Header from "./components/Header.js"
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem';
import Unit from "./components/Unit.js"

const units = [
  {
    title: "One Bedroom",
    number: "40",
    description: "A three bedroom apartment is a type of home that has three bedrooms and can be found in major cities or other large urban areas. The number of bedrooms vary depending on the building’s design and age, but all three are usually equipped with a bath or two. In addition, most three bedroom apartments have kitchens and other amenities you would expect in a home.",
    price: "$1500"
  },
  {
    title: "Two Bedroom",
    number: "5",
    description: "Apartments range from extremely old buildings to state-of-the-art constructions depending on their age and popularity. In some cases, an apartment building has both one and two bedroom units. This is called a duplex and can be beneficial for those who need more space. Many people like the extra square footage that comes with having another room. It can be a great way to add additional living space to a building without increasing the cost of rentals.",
    price: "$2000"
  },
  {
    title: "Three Bedroom",
    number: "5",
    description: "Based on the number of bedrooms a three bedroom apartment has, it can be referred to as a dupraft, duplex or triplex. A three bedroom apartment offers ample living space that is accessible to those with mobility issues or who want to start a family. Anyone looking for an affordable home should consider renting an available three bedroom unit before pricing increases drive interested parties away.",
    price: "$2500"
  },
]

export default function Apartment() {
  return (
    <>
      <Header />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        component="form"
        sx={{ '& > :not(style)': { m: 1, maxWidth: '95%' }, }}
      >
      {units.map((unit) => (
        <MenuItem key={unit.title} sx={{justifyContent: "center", whiteSpace: 'normal'}}>
          <Unit title={unit.title} number={unit.number} description={unit.description} price={unit.price}/>
        </MenuItem>
      ))}
      </Box>
      

    </>

  );
}