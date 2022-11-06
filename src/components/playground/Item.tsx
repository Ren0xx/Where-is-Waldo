import { Box, ListItemButton } from "@mui/material";

type ItemProps = {
    name: string;
    src: any;
    handleChoice: (choice: string) => void;
};
const Item = (props: ItemProps) => {
    const { name, src, handleChoice } = props;
    return (
        <Box>
            <ListItemButton onClick={() => handleChoice(name)}>
                <img src={src} alt='.' width='60px' height='auto' />
                <p>{name}</p>
            </ListItemButton>
        </Box>
    );
};

export default Item;
