// Initialize leave balances
let casualLeaveBalance = 10;
let medicalLeaveBalance = 15;

// DOM elements
const casualLeaveElement = document.getElementById('casual-leave-balance');
const medicalLeaveElement = document.getElementById('medical-leave-balance');
const leaveForm = document.getElementById('leave-form');
const leaveTypeSelect = document.getElementById('leave-type');
const leaveDaysInput = document.getElementById('leave-days');
const messageElement = document.getElementById('message');

// Update UI with current leave balances
function updateLeaveBalances() {
    casualLeaveElement.textContent = casualLeaveBalance;
    medicalLeaveElement.textContent = medicalLeaveBalance;
}

// Handle leave application
leaveForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting to the server
    
    const leaveType = leaveTypeSelect.value;
    const leaveDays = parseInt(leaveDaysInput.value);

    // Check if the number of days is valid
    if (leaveDays <= 0) {
        messageElement.textContent = 'Please enter a valid number of days.';
        messageElement.style.color = 'red';
        return;
    }

    // Process leave request
    if (leaveType === 'casual' && leaveDays <= casualLeaveBalance) {
        casualLeaveBalance -= leaveDays;
        messageElement.textContent = `You have successfully applied for ${leaveDays} days of Casual Leave.`;
        messageElement.style.color = 'green';
    } else if (leaveType === 'medical' && leaveDays <= medicalLeaveBalance) {
        medicalLeaveBalance -= leaveDays;
        messageElement.textContent = `You have successfully applied for ${leaveDays} days of Medical Leave.`;
        messageElement.style.color = 'green';
    } else {
        messageElement.textContent = `You do not have enough leave balance for the requested number of days.`;
        messageElement.style.color = 'red';
    }

    // Update leave balances on the screen
    updateLeaveBalances();
    
    // Clear the input field
    leaveDaysInput.value = '';
});
