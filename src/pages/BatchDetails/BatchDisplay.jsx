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
			const batchCollectionRef = new FireStoreCollection("Batches");
			// reference to their students collection of their batch
			const batchStudentCollectionRef = batchCollectionRef.customCollectionRef(`${id}/Students`)

			const snapshotData = await batchCollectionRef.getCollectionData(
				batchStudentCollectionRef
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
              return <ProfileDetails
                key={student?.id}
                fname={student?.name}
                rollNumber={student?.rollNumber}
                insta={student?.insta ?? ""}
                gmail={student?.email ?? ""}
                linkedin={student?.linkedIn ?? ""}
                image={student?.profilePic ?? ""}
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
