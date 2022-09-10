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
      // create collection ref
      const batchCollectionRef = new FireStoreCollection("Batch");

      // fetch the details collection 
      const data = await batchCollectionRef.getDetails();
      console.log(data)

      // save to the state and redux
      const saveDataToState = data.map( ({id, startingYear, endingYear, title}) => {
        return new BatchOverallData(id, title, startingYear, endingYear);
      } );
      setAllBatchDetails( saveDataToState );
      setIsLoading(false);

    }

    //! check if data is not in the redux then grab it from the fireabase
    batchData();
  
  }, [])
  
  console.log(Object.is(allBatchDetails, {}) )
  return (
    <div className="batch__card">
      {
        isLoading && 
        [1,2,3,4,5].map(num => <BatchColumn key={num} isLoading />)
      }
      {
        allBatchDetails && 
        allBatchDetails.map((batch) => {
          return (
            <BatchColumn key={batch.id} id={batch.id} title={batch.title} session={batch.session} />
          )
        })
      }
    </div>
  )
}

export default Batch