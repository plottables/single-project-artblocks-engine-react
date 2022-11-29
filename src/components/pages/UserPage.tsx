import Page from 'components/Page';
import { useParams } from 'react-router-dom';
import {appProjectId, coreContractAddress, tokensPerPage} from "../../config";
import {parseAspectRatio} from "../../utils/scriptJSON";
import TokenList from "../TokenList";
import useProject from "../../hooks/useProject";
import Alert from "@mui/material/Alert";
import Loading from "../Loading";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import {OrderDirection} from "../../utils/types";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import {useState} from "react";
import useTokenCount from "../../hooks/useTokenCount";

const UserPage = () => {
    const { address } = useParams();
    const [currentPage, setCurrentPage] = useState(0);
    const [orderDirection, setOrderDirection] = useState(OrderDirection.ASC);
    const { loading, error, data } = useProject(coreContractAddress?.toLowerCase() + '-' + appProjectId);
    const tokenCount = useTokenCount(coreContractAddress?.toLowerCase() + '-' + appProjectId, address || '');

    if (data?.project === null) {
        return <Alert severity="error">Project not found</Alert>
    }

    if (loading) {
        return <Loading />
    }

    let countRetries = 0;
    if (error) {
        if (countRetries < 5) {
            console.log(`refetch ${countRetries}`);
            tokenCount.refetch();
            countRetries++;
        } else {
            return (
                <Alert severity="error">
                    Error loading project
                </Alert>
            )
        }
    }

    const project = data?.project;
    const { invocations, scriptJSON } = project;

    return (
        <Page>
            <Box px={1}>
                <Box mt={4} mb={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h4">{ tokenCount.data?.tokens.length} Item{ Number(tokenCount.data?.tokens.length) === 1 ? '' : 's' }</Typography>


                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    Sort
                                </InputLabel>
                                <NativeSelect
                                    value={orderDirection}
                                    sx={{ fontSize: '14px' }}
                                    onChange={(e) => {
                                        setCurrentPage(0);
                                        setOrderDirection(e.target.value as OrderDirection)
                                    }}
                                >
                                    <option value={OrderDirection.DESC}>Latest</option>
                                    <option value={OrderDirection.ASC}>Earliest</option>
                                </NativeSelect>
                            </FormControl>
                        </Box>

                        <Typography fontSize="14px" pt={2} ml={3}>
                            Showing  { Math.min(invocations, tokensPerPage) }
                        </Typography>
                    </Box>
                </Box>

                <TokenList
                    projectId={coreContractAddress?.toLowerCase() + '-' + appProjectId}
                    first={tokensPerPage}
                    skip={currentPage*tokensPerPage}
                    orderDirection={orderDirection}
                    aspectRatio={parseAspectRatio(scriptJSON)}
                    address={address}
                />

                {tokenCount.data?.tokens.length > tokensPerPage && <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Stack mt={6} mb={8} spacing={2}>
                        <Pagination
                            count={Math.ceil(tokenCount.data?.tokens.length / tokensPerPage)}
                            color="primary"
                            page={currentPage + 1}
                            onChange={(event, page) => {
                                window.scrollTo(0, 0);
                                setCurrentPage(page - 1);
                            }}
                        />
                    </Stack>
                </Box>
                }

            </Box>
        </Page>
    )
}

export default UserPage;
