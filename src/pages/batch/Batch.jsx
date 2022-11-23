import './batch.css';
import BatchColumn from '../../components/BatchColumn';
import { useEffect, useState } from 'react';
import { FireStoreCollection } from '../../Firebase/FireStore/collection';
import { BatchOverallData } from '../../Data/batch.data';

const Batch = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [allBatchDetails, setAllBatchDetails] = useState(undefined);

  useEffect(() => {

    const batchData = async () =>{
      try {
        // create collection ref
        const batchCollectionRef = new FireStoreCollection("Batches");
  
        // fetch the details collection 
        const data = await batchCollectionRef.getSingleDoc("allBatchList");
        console.log(data)
  
        // save to the state and redux
        const saveDataToState = data["batchNumber"].map( ({batch, startingYear, endingYear, title}) => {
          return new BatchOverallData(batch, title, startingYear, endingYear);
        } );
        setAllBatchDetails( saveDataToState );
        setIsLoading(false);
        
      } catch (error) {
        console.log(error)
      }

    }

    //! check if data is not in the redux then grab it from the fireabase
    batchData();
  
  }, [])
  
  return (
    <div className="batch__card">
      {
        isLoading && 
        [1,2,3,4,5].map(num => <BatchColumn key={num} isLoading />)
      }
      {
        allBatchDetails && 
        allBatchDetails.map((batch, id) => {
          return (
            <BatchColumn key={id} id={batch.id} title={batch.title} session={batch.session} />
          )
        })
      }
    </div>
  )
}

export default Batch