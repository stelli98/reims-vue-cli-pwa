import CommonMixins from "@/mixins/common-mixins";
import offlineService from "@/api/transaction-offline";
const GlobalHeader = () => import("@/components/common/GlobalHeader");

export default {
  mixins: [CommonMixins],
  components: { GlobalHeader },
  data() {
    return {
      transactions: []
    };
  },
  computed: {},
  methods: {
    async getAllUnSyncTransaction() {
      const nonOCR = await offlineService.getMedicalData();
      const ocr = await offlineService.getAllDataFromIndexedDB("offlineForms");
      let buffer = [];
      this.transactions = buffer.concat(nonOCR, ocr);
    },
    transactionCategory(category) {
      return category ? category.toLowerCase() : "";
    }
  },
  created() {
    this.getAllUnSyncTransaction();
  }
};
