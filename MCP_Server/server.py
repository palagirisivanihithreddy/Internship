from fastmcp import FastMCP

from programs.even_odd import check_even_odd
from programs.voting import check_voting
from programs.greatest import greatest
from programs.sign import sign_number
from programs.arithmetic import arithmetic
from programs.first10 import first_ten
from programs.firstn import first_n
from programs.table import multiplication_table
from programs.table9 import table_of_9
from programs.sumdigits import sum_digits
from programs.factorial import factorial
from programs.factors import factors
from programs.prime import prime_check
from programs.listsum import list_sum
from programs.grade import calculate_grade
from programs.csvreader import read_csv

mcp = FastMCP("Assignment MCP")

mcp.tool()(check_even_odd)
mcp.tool()(check_voting)
mcp.tool()(greatest)
mcp.tool()(sign_number)
mcp.tool()(arithmetic)
mcp.tool()(first_ten)
mcp.tool()(first_n)
mcp.tool()(multiplication_table)
mcp.tool()(table_of_9)
mcp.tool()(sum_digits)
mcp.tool()(factorial)
mcp.tool()(factors)
mcp.tool()(prime_check)
mcp.tool()(list_sum)
mcp.tool()(calculate_grade)
mcp.tool()(read_csv)

if __name__ == "__main__":
    mcp.run()