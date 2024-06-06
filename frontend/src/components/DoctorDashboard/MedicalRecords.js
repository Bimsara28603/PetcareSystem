import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';


const MedicalRecords = () => {

    let navigate = useNavigate(); 
    const [medicalRecords, setMedicalRecords] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const getAllMedicalRecords = async () => {
            try{
                const response = await axios.get("http://localhost:3001/medicalRecord_api/get_all_records")
                setMedicalRecords(response.data);
            } catch (error){
                console.error("Error getting medical records", error)
            }
        }
        getAllMedicalRecords()
    },[])

    const handleDeleteButton = async (recordID) => {
        try{
            const response = await axios.delete(`http://localhost:3001/medicalRecord_api/delete_record/${recordID}`)
            setMedicalRecords(response.data);
            navigate("/DoctorDashboard/MedicalRecords")
        } catch (error){
            console.error("Error getting medical records", error)
        }
    }

    const handleAddRecordButton = () => {
        navigate(`/DoctorDashboard/CreateMedicalRecord`)
    }

    const handleUpdateButton = (recordID) => {
        navigate(`/DoctorDashboard/UpdateMedicalRecord/${recordID}`)
    }

    
    const filteredAppointments = medicalRecords.filter(record => {
        return (
            record.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.treatment.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    const hanldeGenerateReport = () => {
        html2canvas(document.getElementById('toPrint'), {backgroundColor: '#000'}).then(canvas => {
            let image = canvas.toDataURL('image/png')
            let doc = new jsPDF('p', 'px', [1920,1500])
            doc.addImage(image, 'PNG', 50, 50, 1400, 400)
            doc.save()
        })
    }

    return ( 
        <>
            <div className="searchBar">
            </div>
            <div className="buttonCollection">
                <input type="text" name="doctorSearch" id="doctorSearch" placeholder="Search" onChange={(e) => {setSearchTerm(e.target.value)}} value={searchTerm} />
                <button onClick={handleAddRecordButton}>Add Record</button>
                <button onClick={hanldeGenerateReport}>Print Report</button>
            </div>
            <table className="userDetailsTable" id="toPrint">
                <thead>
                    <tr>
                        <th>Pet Name</th>
                        <th>Date</th>
                        <th>Diagnosis</th>
                        <th>Treatment</th>
                        <th data-html2canvas-ignore="true"></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments && filteredAppointments.map(record => (
                        <tr key={record._id}>
                            <td>{record.petName}</td>
                            <td>{record.date}</td>
                            <td>{record.diagnosis}</td>
                            <td>{record.treatment}</td>
                            <td data-html2canvas-ignore="true">
                                <button onClick={() => {handleUpdateButton(record._id)}}>Update</button>
                                <button onClick={() => {handleDeleteButton(record._id)}}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
     );
}
 
export default MedicalRecords;