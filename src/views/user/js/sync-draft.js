import CommonMixins from "@/mixins/common-mixins";
import offlineService from "@/api/transaction-offline";
const GlobalHeader = () => import("@/components/common/GlobalHeader");
const SyncDraftCard = () => import("@/components/user/SyncDraftCard");

export default {
  mixins: [CommonMixins],
  components: { GlobalHeader, SyncDraftCard },
  data() {
    return {
      transactions: []
    };
  },
  methods: {
    async getAllUnSyncTransaction() {
      const nonOCR = await offlineService.getMedicalData();
      const ocr = await offlineService.getAllDataFromIndexedDB("offlineForms");
      let buffer = [];
      console.log( buffer.concat(nonOCR, ocr))
      this.transactions = buffer.concat(nonOCR, ocr);
    }
   
  },
  created() {
    this.getAllUnSyncTransaction();
  }
};
