import React, {useState} from "react";
import {deleteReceiver, fetchReceivers} from "../api/receiver-api-client/receiver";
import {Receivers} from "../api/receiver-api-client/receiverModels";
import Box from "@mui/material/Box/Box";
import Paper from "@mui/material/Paper";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

export const Receiver = () => {
    const [receivers, setReceivers] = useState<Receivers>({} as Receivers);

    let values : unknown[];

    fetchReceivers().then((response) => {
        values = Object.values(response[0]);
        let localReceivers = {} as Receivers;
        localReceivers.receivers = [];

        values.map((value, index) => {
            localReceivers.receivers.push({
                id: index,
                // @ts-ignore
                name: value as string
            });
        })

        if (receivers.receivers == undefined || receivers.receivers.length === 0) {
            setReceivers(localReceivers);
        }
    }).catch((error) => {
        console.error(error);
    });

    const handleClick = (id: number) => {
        deleteReceiver(id).then(() => {
            fetchReceivers();
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 1000, margin: 'auto' }}>
            <Paper elevation={3}>
                <Typography sx={{textAlign: 'center'}} variant="h3">Receivers</Typography>
                <IconButton>
                    <AddIcon />
                </IconButton>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Receiver ID</TableCell>
                                <TableCell>Receiver Name</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {receivers?.receivers?.map((receiver) => {
                                return (
                                    <TableRow key={receiver.id}>
                                        <TableCell>{receiver.id}</TableCell>
                                        <TableCell>{receiver.name}</TableCell>
                                        <TableCell>
                                            <IconButton>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton aria-label="Delete" onClick={() => { handleClick(receiver.id) }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
}