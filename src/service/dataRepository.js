import { getDatabase, ref, onValue, set, remove, off } from "firebase/database";

class DataRepository {
  constructor(app) {
    this.db = getDatabase(app);
  }

  syncDatas() {
    const query = ref(this.db, `lse126/datas`);
    onValue(query, (snapshot) => {
      const value = snapshot.val();
      console.log(value);
    });
    return () => off(query);
  }

  removeData(data) {
    remove(ref(this.db, `lse126/datas/${data.id}`));
  }

  saveData(data) {
    console.log(data.id);
    set(ref(this.db, `lse126/datas/${data.id}`), data);
  }
}

export default DataRepository;
