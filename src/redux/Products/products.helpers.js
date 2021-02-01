import {firestore, storageRef} from './../../firebase/utils';
import men from '../../assets/Casual-Street-Style-Outfits-For-This-Season-2015-1-701x958.jpg'

export const handleAddProduct = product => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc()
            .set(product)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    });
}

export const handleFetchProducts = ({filterType, startAfterDoc, persistProducts = []}) => {
    return new Promise((resolve, reject) => {
        const pageSize = 3;

        let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize)

        if (filterType) ref = ref.where('productCategory', '==', filterType);
        if (startAfterDoc) ref = ref.startAfter(startAfterDoc)

        ref
            .get()
            .then(snapshot => {
                const totalCount = snapshot.size;

                const data = [
                    ...persistProducts,
                    ...snapshot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            documentID: doc.id
                        }
                    })
                ]

                resolve({
                    data,
                    queryDoc: snapshot.docs[totalCount - 1],
                    isLastPage: totalCount < pageSize
                });
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const handleDeleteProduct = documentID => {
    console.log(documentID, 1)
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc(documentID)
            .delete()
            .then(() => {
                console.log(documentID, 2)
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    });
}
