interface Props{

value:string;

onChange:(value:string)=>void;

}


export default function EnrollmentTypeSelector({
value,
onChange

}:Props){


return (

<select

value={value}

onChange={(e)=>
onChange(e.target.value)
}

className="
border
p-2
rounded-lg
w-full
"

>

<option value="NEW_STUDENT">
New Student
</option>


<option value="CONTINUING">
Continuing Student
</option>

 
<option value="TRANSFER">
Transfer Student
</option>


</select>

);

}