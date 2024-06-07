import React, {useState} from "react";
import {Train as TrainType, Trains} from "../api/train-api-client/trainModels";
import Box from "@mui/material/Box/Box";
import Paper from "@mui/material/Paper";
import {
    Button,
    IconButton,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import {addTrain, deleteTrain, fetchCars, fetchTrains} from "../api/train-api-client/train";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';

export const Train = () => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [trains, setTrains] = useState<Trains>({} as Trains);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [receiver, setReceiver] = useState<string>('');
    const [carCount, setCarCount] = useState<number>();

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    let values : unknown[];

    if (firstLoad) {

        let localTrains = {} as Trains;
        localTrains.trains = [];

        fetchTrains().then((response) => {
            values = response[0];
            if (values.length > 0) {
                values.map((value, index) => {
                    // @ts-ignore
                    fetchCars(value.id).then((response) => {
                        // @ts-ignore
                        localTrains.trains.push(response[0] as TrainType);
                        setTrains(localTrains);
                        console.log(localTrains.trains)
                    }).catch((error) => {
                        console.error(error);
                    });
                });
            }

            console.log(localTrains.trains);
        }).catch((error) => {
            console.error(error);
        });

        setFirstLoad(false);
    }

    const handleClickAddTrain = () => {

        const newId = trains.trains.length + 1;

        const train = {
            id: newId,
            name: name,
            destination: destination,
            receiver: receiver,
        } as TrainType;

        addTrain(train)
            .then(() => {
                trains.trains.push(train);
                setTrains(trains);
                setOpen(false);
            })
            .catch((error) => {
                console.error(error);
        });
    }

    const handleEditClick = (id: number) => {
        const train = trains.trains.find((train) => train.id === id);

        if (train) {
            setName(train.name);
            setDestination(train.destination);
            setReceiver(receiver);
            setCarCount(carCount);
        }

        setOpen(true);
    }

    const handleDeleteClick = (id: number) => {
        deleteTrain(id).then(() => {
            trains.trains = trains.trains.filter((train) => train.id !== id);
            setTrains(trains);
        }).catch((error) => {
            console.error(error);
        });
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <><Box sx={{width: '100%', maxWidth: 1000, margin: 'auto'}}>
            <Paper elevation={3}>
                <Typography sx={{textAlign: 'center'}} variant="h3">Trains</Typography>
                <IconButton onClick={() => {handleOpen(); }}>
                    <AddIcon/>
                </IconButton>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Train ID</TableCell>
                                <TableCell>Train Name</TableCell>
                                <TableCell>Train Destination</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trains?.trains?.map((train) => {
                                return (
                                    <TableRow key={train.id}>
                                        <TableCell>{train.id}</TableCell>
                                        <TableCell>{train.name}</TableCell>
                                        <TableCell>{train.destination}</TableCell>
                                        <TableCell>
                                            <IconButton aria-label="Edit" onClick={() => {
                                                handleEditClick(train.id);
                                            }}>
                                                <EditIcon/>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton aria-label="Delete" onClick={() => {
                                                handleDeleteClick(train.id);
                                            }}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box><Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography sx={{justifyContent: "space-between"}} id="modal-modal-title" variant="h6" component="h2">
                        Add a Train
                    <IconButton sx={{margin: "auto"}} aria-label="Delete" onClick={() => { handleClose(); }}>
                        <CloseIcon sx={{paddingRight: "2px"}}/>Close
                    </IconButton>
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}>
                    <TextField id="train name"
                               value={name}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                   setName(event.target.value);
                               }}
                               label="Train Name" variant="outlined" />
                    <TextField id="train-destination"
                               value={destination}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                   setDestination(event.target.value);}
                               }
                               label="Destination" variant="outlined" />
                    <TextField id="receiver"
                               value={receiver}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                   setReceiver(event.target.value);}
                               }
                               label="Receiver" variant="outlined" />
                    <TextField id="carCount"
                               value={carCount}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                   // @ts-ignore
                                   setCarCount(event.target.value);}
                               }
                               label="Car Count" variant="outlined" />
                    <Button variant="contained" onClick={handleClickAddTrain}>Submit</Button>
                </Box>
            </Box>
        </Modal></>
    )
}