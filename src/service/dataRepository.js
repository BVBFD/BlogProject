import { getDatabase, ref, onValue, set, remove, off } from "firebase/database";

class DataRepository {
  constructor(app) {
    this.db = getDatabase(app);
  }

  syncDatas(onUpdate) {
    const query = ref(this.db, `lse126/datas`);
    onValue(query, (snapshot) => {
      const value = snapshot.val();
      console.log(value);
      onUpdate(value);
    });
    return () => off(query);
  }

  removeData(data) {
    remove(ref(this.db, `lse126/datas`));
  }

  saveData(datas) {
    set(ref(this.db, `lse126/datas`), datas);
  }
}

export default DataRepository;
