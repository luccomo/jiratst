export async function updateJiraStatus(newStatus, itemDescription) {
    if (!window.AP) {
        console.warn('Jira AP object not available');
        return false;
    }

    try {
        await AP.request({
            url: `/rest/api/3/issue/${AP.context.getIssueKey()}`,
            type: 'PUT',
            data: JSON.stringify({
                fields: {
                    customfield_xxxxx: newStatus
                }
            }),
            contentType: 'application/json'
        });
        console.log(`Status updated successfully for ${itemDescription}`);
        return true;
    } catch (error) {
        console.error('Error updating status:', error);
        return false;
    }
}