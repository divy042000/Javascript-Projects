let arry = [5, 4, 3, 2, 1];
function sort(arry)
{
    for (i = 1; i < arry.length; i++)
    {
        j = i;
        while (j > 0 && arry[j-1] > arry[j])
        {
            [arry[j],arry[j-1]]=[arry[j-1],arry[j]]
            j--;
        }
    }
}
sort(arry)
for (i = 0; i < arry.length; i++){console.log(arry[i])} 