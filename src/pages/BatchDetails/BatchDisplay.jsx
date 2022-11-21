import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileDetails from "../../components/ProfileDetails";
import { FireStoreCollection } from "../../Firebase/FireStore/collection";
import { BatchDetails } from "./BatchDetails";



const BatchDisplay = () => {
	const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
	const [batchStudents, setBatchStudents] = useState([]);

	useEffect(() => {
		const fetchBatchDetails = async () => {
			// create collection ref
			const batchCollectionRef = new FireStoreCollection("Batch");

			// fetch the details collection

			// batch doc details path: Batch -> allBatch/fullDetails/40
			const batchDocDetailsRef = batchCollectionRef.customCollectionRef(
				"allBatch/fullDetails"
			);

			// collection of students will be: Batch -> allBatch/fullDetails/40/Students
			const batchStudentDetailsRef = batchCollectionRef.customCollectionRef(
				"allBatch/fullDetails/40/Students"
			);

			const snapshotData = await batchCollectionRef.getCollectionData(
				batchStudentDetailsRef
			);

			const data = snapshotData.map((doc) => ({ id: doc.id, ...doc.data() }));

			// save to the state and redux
			setBatchStudents((d) => data);
      setIsLoading(false);
		};
		fetchBatchDetails();
	}, []);


	return (
		<div>
			<div className="section team">
				<h2>Meet Your Senior / Junior / BatchMates</h2>
				<div className="batchcontainer team__container">
          {/* 
            // Improvise this for Skeleton Loader
            isLoading && 
            [1,2,3,4].map( num => 
              <ProfileDetails
                isLoading
                
              />
              )
             */}
          {
            !Object.is(batchStudents, []) && batchStudents.map(student => {
				console.log(student)
              return <ProfileDetails
                key={student?.id}
                fname={student?.Name}
                company={student?.Company}
                insta={student?.Insta ?? ""}
                gmail={student?.Email ?? ""}
                linkedin={student?.linkedin ?? ""}
                image={student?.PhotoRef ?? ""}
				isLoading={false}
              />
            })
          }
          
				</div>
			</div>
		</div>
	);
};

export default BatchDisplay;
