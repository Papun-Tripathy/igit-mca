import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "./verifystudent.css";
import { useSelector } from "react-redux";
import { FireStoreCollection } from "../../../Firebase/FireStore/collection";
import { where } from "firebase/firestore";
import { CircularProgress } from "@mui/material";
import Modal from './Modal'

function VerifyStudent() {
    const userData = useSelector((state) => state.user);
    const [unVerifyedStudents, setUnVerifyedStudents] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [refreshPage, setRefreshPage] = useState(false);
    const [show, setShow] = React.useState(false);
    useEffect(() => {
        // fetch all the users of that batch whose data is not verifyed
        const getNonVerifyedUserData = async () => {
            setIsLoadingData(true);
            try {
                const usersCollection = new FireStoreCollection("User");
                const batchSelector = where("batch", ">=", userData?.batch ?? 0);
                const notVerifyedUsersFilter = where("verifyed", "==", false);
                const usersData = await usersCollection.getCollectionDataWithQuery(
                    null,
                    batchSelector,
                    notVerifyedUsersFilter
                );
                const arrayData = usersData.map((d) => {
                    const data = d.data();
                    const id = d.id;
                    return {
                        id,
                        ...data,
                    };
                });
                setUnVerifyedStudents(arrayData);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoadingData(false);
            }
        };
        getNonVerifyedUserData();
    }, [refreshPage]);

    const verifyStudent = async (id, data) => {
        const userRef = new FireStoreCollection("User");
        try {
            await userRef.updateDocument(id, { ...data, verifyed: true });
            setRefreshPage(!refreshPage);
        } catch (error) {
            console.log(error);
        }
    };

    const rejectStudent = async (id) => {
        // delete his photo also
        const userRef = new FireStoreCollection("User");
        try {
            await userRef.deleteDocument(id);
            setRefreshPage(!refreshPage);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="verifystudent">
            <table className="verifytable">
                <thead className="verifyhead">
                    <tr>
                        <td align="center">Serial No</td>
                        <td align="center">Name</td>
                        <td align="center">Batch</td>
                        <td align="center">Roll No.</td>
                        <td align="center">Image</td>
                        <td align="center">Action</td>
                    </tr>
                </thead>
                <tbody className="verifybody">
                    {isLoadingData ? (
                        <tr>
                            <td>
                                <CircularProgress />
                            </td>
                        </tr>
                    ) : (
                        unVerifyedStudents?.map((student, i) => {
                            return (
                                <tr key={student.id}>
                                    <td align="center">{i + 1}</td>
                                    <td align="center">{student?.name}</td>
                                    <td align="center">{student?.batch}</td>
                                    <td align="center">{student.rollNumber}</td>
                                    <td align="center">

                                        <VisibilityIcon onClick={() => setShow(true)}>
                                        </VisibilityIcon>
                                        < Modal show={show} onClose={() => setShow(false)}>
                                            <img src={student.profilePic} alt='' className="modalimagepreview"/>
                                        </Modal>

                                    </td>
                                    <td align="center" className="table_action_body">
                                        <CheckIcon
                                            onClick={(_) => verifyStudent(student.id, student)}
                                        />
                                        <CloseIcon onClick={(_) => rejectStudent(student.id)} />
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div >
    );
}

export default VerifyStudent;
