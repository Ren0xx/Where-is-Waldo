import { Box, ListItemButton } from "@mui/material";

type ItemProps = {
    name: string;
    src: string | undefined;
    found: boolean;
    handleChoice: (choice: string) => void;
};
const Item = (props: ItemProps) => {
    const { name, src, found, handleChoice } = props;
    return (
        <Box>
            <ListItemButton disabled={found} onClick={() => handleChoice(name)}>
                <img src={src} alt='.' width='60px' height='auto' />
                <p>{name}</p>
            </ListItemButton>
        </Box>
    );
};

export default Item;
