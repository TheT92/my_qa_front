import { ACTION_FAIL, ACTION_SUCCESS } from "@/constants";

export default {
    components: {},
    data() {
        return {
        };
    },
    methods: {
        msgSuccess(str) {
            this.$message({
                message: str || ACTION_SUCCESS,
                type: 'success'
            });
        },
        msgError(str) {
            this.$message({
                message: str || ACTION_FAIL,
                type: 'error'
            });
        },
    },
};