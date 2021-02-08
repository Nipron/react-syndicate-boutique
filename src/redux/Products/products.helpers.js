import firebase, {firestore} from './../../firebase/utils';

export const handleAddProduct = product => {

    return new Promise((resolve, reject) => {

        product.productFileNameDate = new Date + ' ' + product.productFile.name;
        let storageRef = firebase.storage().ref(`images/${product.productFileNameDate}`);
        let uploadTask = storageRef.put(product.productFile)

        uploadTask.then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                product.productThumbnail = url;
                product.productFile = "null";
            })
            .then(() => {
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
            })
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
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc(documentID)
            .get()
            .then(snapshot => {
                firebase
                    .storage()
                    .ref(`images/${snapshot.data().productFileNameDate}`)
                    .delete()
            })
            .then(() => {
                firestore
                    .collection('products')
                    .doc(documentID)
                    .delete()
            })
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    });
}

export const handleFetchProduct = productID => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc(productID)
            .get()
            .then(snapshot => {
                if (snapshot.exists) {
                    resolve(
                        snapshot.data()
                    );
                }
            })
            .catch(err => {
                reject(err);
            })
    })
}
